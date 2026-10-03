import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface Props {
  idPartido: number;
  idEvaluador: number;
  idEvaluado: number;
  nombreEvaluado: string;
}

export function FormularioEvaluacion({ idPartido, idEvaluador, idEvaluado, nombreEvaluado }: Props) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0) 
  const [enviado, setEnviado] = useState(false)
  const [cargando, setCargando] = useState(false)

  const enviarEvaluacion = async () => {
    if (rating === 0) return
    setCargando(true)
    
    const { error } = await supabase
      .from('evaluaciones_partido')
      .insert({
        id_partido: idPartido,
        id_evaluador: idEvaluador,
        id_evaluado: idEvaluado,
        estrellas: rating
      })

    if (!error) {
      setEnviado(true)
    } else {
      console.error(error)
      alert('Hubo un error al enviar la evaluación. ¿Quizás ya lo calificaste?')
    }
    setCargando(false)
  }

  if (enviado) {
    return (
      <div className="p-4 text-center border border-green-200 bg-green-50 rounded-xl">
        <p className="text-xs text-green-700 font-bold uppercase tracking-wider">¡Evaluación enviada!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center p-4 border border-zinc-200 rounded-xl bg-white">
      <p className="text-xs font-bold text-zinc-600 mb-2">Califica a {nombreEvaluado}</p>
      
      {/* Contenedor de las 5 estrellas */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className={`text-3xl transition-colors ${
              (hover || rating) >= star ? 'text-yellow-400' : 'text-zinc-200'
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <button
        onClick={enviarEvaluacion}
        disabled={rating === 0 || cargando}
        className="w-full py-2.5 bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
      >
        {cargando ? 'Enviando...' : 'Enviar Evaluación'}
      </button>
    </div>
  )
}