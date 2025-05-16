import Image from 'next/image'
import loading from '../../../public/loading-5.gif'

export default function Carregando() {
    return (
        <div className='flex justify-center items-center mt-52'>
            <Image
                priority
                src={loading}
                alt="loading"
                width={300}
                height={300}
            />
        </div>
    )
}