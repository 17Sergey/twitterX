import XSvg from '../../svgs/XSvg';
import UserProfile from '../UserProfile';
import SidebarMenu from './SidebarMenu';

export default function Sidebar() {
    return (
        <div className="max-w-56 flex flex-col h-screen pt-2 pb-8 border-r border-neutral">
            <XSvg className="w-10 fill-[--theme-accent]" />
            <SidebarMenu />
            <UserProfile className={'mt-auto'} />
        </div>
    );
}
