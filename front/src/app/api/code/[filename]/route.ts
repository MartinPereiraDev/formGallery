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
                { error: 'Nombre de archivo inválido' },
                { status: 400 }
            )
        }

        // Construir la ruta del archivo
        const filePath = join(process.cwd(), 'src', 'components',
            filename.startsWith('login') ? 'login' : 'register',
            filename
        )

        // Leer el contenido del archivo
        const fileContent = readFileSync(filePath, 'utf-8')

        // Retornar el contenido como texto plano
        return new NextResponse(fileContent, {
            headers: {
                'Content-Type': 'text/plain',
            },
        })
    } catch (error) {
        console.error('Error reading file:', error)
        return NextResponse.json(
            { error: 'Error al leer el archivo' },
            { status: 500 }
        )
    }
} 