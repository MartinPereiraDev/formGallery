import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    try {
        const { filename } = await params

        // Validar el nombre del archivo para evitar path traversal
        if (!filename.match(/^(loginForm|registerForm)\d+\.tsx$/)) {
            return NextResponse.json(
                { error: 'Invalid file name' },
                { status: 400 }
            )
        }

        // build the file path
        const filePath = join(process.cwd(), 'src', 'components',
            filename.startsWith('login') ? 'login' : 'register',
            filename
        )

        // read the file content
        const fileContent = readFileSync(filePath, 'utf-8')

        // return the content as plain text
        return new NextResponse(fileContent, {
            headers: {
                'Content-Type': 'text/plain',
            },
        })
    } catch (error) {
        console.error('Error reading file:', error)
        return NextResponse.json(
            { error: 'Error reading the file' },
            { status: 500 }
        )
    }
} 