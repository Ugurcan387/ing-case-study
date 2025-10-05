import {msg} from '@lit/localize';

import { DEPARTMENT, POSITION } from './options.config';

export const INPUT_TYPES = {
    INPUT: 'input',
    DATE: 'date',
    SELECT: 'select'
}

export const RULE_SET = {
    REQUIRED: {
        validator: (value) => value.trim().length,
        message: () => msg('Required!')
    },
    EMAIL: {
        validator: (value) => /^\s*[-\w.]+(?<![-_.])@(?:[-\w])+\.+[\w-]{2,24}\s*$/.test(value),
        message: () => msg('Email format is incorrect!')
    },
    DATE: {
        validator: (value) =>  !isNaN(new Date(value)),
        message: () => msg('Invalid date!')
    }
}

export const formConfig = [
    {
        key: 'firstName',
        label: () => msg('First Name'),
        rules: [RULE_SET.REQUIRED],
        type: INPUT_TYPES.INPUT
    },
    {
        key: 'lastName',
        label: () => msg('Last Name'),
        rules: [RULE_SET.REQUIRED],
        type: INPUT_TYPES.INPUT
    },
    {
        key: 'dateOfEmployment',
        label: () => msg('Date of Employment'),
        rules: [RULE_SET.REQUIRED, RULE_SET.DATE],
        type: INPUT_TYPES.DATE
    },
    {
        key: 'dateOfBirth',
        label: () => msg('Date of Birth'),
        rules: [RULE_SET.REQUIRED, RULE_SET.DATE],
        type: INPUT_TYPES.DATE
    },
    {
        key: 'phone',
        label: () => msg('Phone'),
        rules: [RULE_SET.REQUIRED],
        type: INPUT_TYPES.INPUT
    },
    {
        key: 'email',
        label: () => msg('Email'),
        rules: [RULE_SET.REQUIRED, RULE_SET.EMAIL],
        type: INPUT_TYPES.INPUT
    },
    {
        key: 'department',
        label: () => msg('Department'),
        rules: [RULE_SET.REQUIRED],
        type: INPUT_TYPES.SELECT,
        props: {
            options: Object.values(DEPARTMENT)
        }
    },
    {
        key: 'position',
        label: () => msg('Position'),
        rules: [RULE_SET.REQUIRED],
        type: INPUT_TYPES.SELECT,
        props: {
            options: Object.values(POSITION)
        }
    }
]