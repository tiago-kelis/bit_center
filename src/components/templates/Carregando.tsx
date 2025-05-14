import Image from 'next/image'
import loading from '../../../public/loading.gif'

export default function Carregando() {
    return (
        <div className='pagina justify-center items-center'>
            <Image
                priority
                src={loading}
                alt="loading"
                width={40}
                height={40}
            />
        </div>
    )
}