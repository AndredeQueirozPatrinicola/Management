import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"

import NavGraphIcon from '@/src/components/NavGraphIcon.jsx'

export default function NavBar() {
    return (
        <div className="flex w-full border bg-card text-card-foreground shadow min-h-10 py-2">
            <Link to="/">
                    <NavGraphIcon/>
                </Link>
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>Menu</MenubarTrigger>
                        <MenubarContent>
                        <MenubarItem>
                            <Link to="/tasks/">
                                Tasks
                            </Link>
                            <MenubarShortcut>
                                <FontAwesomeIcon icon={faPencil} />
                            </MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Share</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Print</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
            </Menubar>
        </div>
    );
}