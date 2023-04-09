import Image from 'next/image'

import { useRouter } from 'next/navigation';

import { useAuthContext } from '../context/AuthContext'
import logOut from '../../firebase/auth/logout'

export default function Navbar() {
    const router = useRouter();

    const { user } = useAuthContext()

    const askLogin = () => {
        router.push("/auth/login")
    }
    
  return (
    <nav className="pb-5 flex items-center place-content-between">
        <div className="logo flex items-center">
            <div className="logo-image">
                <Image
                src="/logo.png"
                alt="CurryCoolum logo"
                height={70}
                width={250}
                />
            </div>
        </div>

        <div className="user">
            {user ? <p className='font-[800] text-xl' onClick={logOut}>{user.displayName}</p> : <button onClick={askLogin}>Login</button>}
        </div>
    </nav>
  )
}
