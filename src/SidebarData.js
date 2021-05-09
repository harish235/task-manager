import React from 'react';
import { HiClipboardList } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { TiGroup } from 'react-icons/ti';

export const SidebarData = [
    {
        title: 'Tasks',
        path: '/',
        icon: <HiClipboardList />,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <CgProfile />,
        cName: 'nav-text'
    },
    {
        title: 'Groups',
        path: '/groups',
        icon: <TiGroup />,
        cName: 'nav-text'
    }
]