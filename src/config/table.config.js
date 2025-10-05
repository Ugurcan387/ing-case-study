
import {msg} from '@lit/localize';

import { DEPARTMENT, POSITION } from './options.config';

export const tableConfig = [
    {
        key: 'firstName',
        label: () => msg('First Name'),
        width: '200'
    },
    {
        key: 'lastName',
        label: () => msg('Last Name'),
        width: '200'
    },
    {
        key: 'dateOfEmployment',
        label: () => msg('Date of Employment'),
        render: (value) => new Date(value).toLocaleDateString('en-GB'),
        width: '250'
    },
    {
        key: 'dateOfBirth',
        label: () => msg('Date of Birth'),
        render: (value) => new Date(value).toLocaleDateString('en-GB'),
        width: '200'
    },
    {
        key: 'phone',
        label: () => msg('Phone'),
        width: '250'
    },
    {
        key: 'email',
        label: () => msg('Email'),
        width: '300'
    },
    {
        key: 'department',
        label: () => msg('Department'),
        render: (value) => Object.values(DEPARTMENT).find((option) => option.value === value).label(),
        width: '200'
    },
    {
        key: 'position',
        label: () => msg('Position'),
        render: (value) => Object.values(POSITION).find((option) => option.value === value).label(),
        width: '200'
    }
]