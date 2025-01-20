import '../index.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
    <header className="header w-full text-white bg-black p-4">
        <nav className="nav flex items-center text-sm font-semibold">
            <ul className='px-[10px] ml-5'>
               <li> <Link to={'/'}>goCabs</Link> </li>
            </ul>
            <ul className='flex gap-[10px] px-[10px] w-[74%]'>
                <li className='flex items-center py-[3px] px-[15px] cursor-pointer hover:bg-[#776464bb] rounded-[30px]'><Link to={'/ride'}>Ride</Link></li>
                <li className='flex items-center py-[3px] px-[15px] cursor-pointer hover:bg-[#776464bb] rounded-[30px]'><Link to={'/drive'}>Drive</Link></li>
            </ul>
            <ul className='flex gap-1'>
                <li className='flex items-center py-[3px] px-[12px] cursor-pointer hover:bg-[#776464bb] rounded-[30px]'>Guest</li>
                <li className='flex items-center py-[3px] px-[12px] cursor-pointer hover:bg-[#776464bb] rounded-[30px]'><Link to={'/login'}>Log in</Link></li>
                <button className='flex items-center py-[3px] px-[12px] bg-white text-black cursor-pointer hover:bg-[rgba(255,255,255,0.9)] rounded-[30px]' ><Link to={'/signup'}>Sign up</Link></button>
            </ul>
        </nav>
    </header>
    </>
  )
}
