import { MdHomeFilled } from 'react-icons/md';
import { IoNotifications } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import SidebarMenuItem from './SidebarMenuItem';

export default function SidebarMenu() {
    return (
        <div className="mt-8">
            <ul>
                <li>
                    <SidebarMenuItem
                        icon={<MdHomeFilled />}
                        text={'Home'}
                    />
                </li>
                <li>
                    <SidebarMenuItem
                        icon={<IoNotifications />}
                        text={'Notifications'}
                    />
                </li>
                <li>
                    <SidebarMenuItem
                        icon={<FaUser />}
                        text={'Profile'}
                    />
                </li>
            </ul>
        </div>
    );
}
