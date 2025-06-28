import connectDb from '@/db/connection';
import { authOptions } from '@/lib/authOptions';
import Document from '@/models/Documents';
import { getServerSession } from 'next-auth';
import * as XLSX from 'xlsx';


export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized Access' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        await connectDb();
        const data = await Document.find({ verified: true }).lean();

        // if data is not available 
        if (!data) {
            return Response.json(
                { success: false, message: 'verified students data not exist' },
                { status: 500 }
            );
        }

        // filter data 
        const filteredData = data.map((student) => {
            return {
                'Name': student.name,
                'Father Name': student.fathername,
                'Mother Name': student.mothername,
                'City': student.city,
                'Institution': student.insistitution,
                'Exam': student.exam,
                'Marks': student.result,
                'Marksheet': student.marksheet,
            }
        })

        // create worksheet and workbook for data
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "studentdata");

        // generate excel buffer 
        const buffer = XLSX.write(workbook, {
            type: 'buffer',
            bookType: 'xlsx',
        });
        return new Response(buffer, {
            status: 200,
            headers: {
                'Content-Type':
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="students.xlsx"',
            },
        });


    } catch (error) {
        console.error('excel export failed : ', error);
        return Response.json(
            { success: false, message: 'Failed to export data' },
            { status: 500 }
        );
    }
}