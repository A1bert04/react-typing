import { useEffect, useState } from 'react'

const wordsArray = [
    "react", "typescript", "javascript", "html", "css", "frontend", "backend",
    "component", "state", "props", "hook", "useEffect", "useState", "API",
    "npm", "node", "express", "router", "typescript", "asynchronous",
    "json", "jsx", "tsx", "render", "promise", "event", "function",
    "context", "module", "babel", "var", "realsociedad", "barça", "lewandoski"
];

export default function App() {

    type phases = "begin" | "game" | "end"
    const [phase, setPhase] = useState<phases>("begin")
    const [chrono, setChrono] = useState(0)
    const [currentWord, setCurrentWord] = useState<string>("react")
    const [typedWord, setTypedWord] = useState<string>()
    const [score, setScore] = useState<{right: number, wrong: number}>({right: 0, wrong: 0})

    const handleBegin = () => {
        changeWord()
        setPhase("game")
        setTypedWord("")
        setChrono(60)
        setScore({right: 0, wrong: 0})
    }

    const changeWord = () => {
        const randomIndex = Math.floor(Math.random() * wordsArray.length)
        setCurrentWord(wordsArray[randomIndex])
    }

    const handleSubmit = () => {
        console.log(typedWord, currentWord)
        if (typedWord === currentWord) {
            setScore({right: score.right + 1, wrong: score.wrong})
        } else {
            setScore({right: score.right, wrong: score.wrong + 1})
        }
        changeWord()
        setTypedWord("")
    }

    useEffect(() => {
        if (phase === "game") {
            const interval = setInterval(() => {
                setChrono((prev) => prev - 1)
            }, 1000)

            if (chrono === 0) {
                setPhase("end")
            }
            return () => clearInterval(interval)
        }
    }, [chrono, phase])


    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-zinc-100 text-slate-800 gap-20">
            <header className='flex flex-col gap-4'>
                <div className='flex flex-row justify-center text-center'>
                    <h1 className='text-4xl'>typeReact</h1>
                </div>
                <div>
                    <p className='text-md'>Trata de escribir el máximo de palabras en 1 minuto</p>
                </div>
            </header>
            {phase === "game" && <div className='flex flex-col gap-4'>
                <div className='text-xl text-center'>Puntuación: {score.right} aciertos y {score.wrong} fallos</div>
                <div className='text-4xl text-center'>00:{chrono}</div>
                <div className='text-3xl text-center'>Palabra actual: 
                    <span className='ml-2 italic text-5xl'>{currentWord}</span>
                </div>
                <div className='flex flex-row justify-center'>
                <input type="text" 
                    className='text-2xl p-4 text-center border-b-2 border-slate-800 rounded-md bg-transparent w-96' 
                    onChange={(e) => setTypedWord(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit()
                        }
                    }} 
                    value={typedWord}
                    />
                    </div>
            </div>}
            { phase === "begin" && <BeginButton handleBegin={handleBegin} />}
            { phase === "end" && <div className='flex flex-col gap-4'>
                <div className='text-4xl text-center'>Fin del juego</div>
                <div className='text-2xl text-center'>Tu puntuación ha sido de {score.right} aciertos y {score.wrong} fallos</div>
                <BeginButton handleBegin={handleBegin} />
            </div>}
        </div>
    )
}

function BeginButton({ handleBegin }: { handleBegin: () => void }) {
    return (
        <button
            className='bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded'
            onClick={handleBegin}>
            Empezar
        </button>
    )
}