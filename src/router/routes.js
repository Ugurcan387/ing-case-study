import '../views/userOverview.js';
import '../views/userEdit.js';
import '../views/userAdd.js';

export const views = [
    {
        path: '/',
        component: 'user-overview',
        title: 'Overview',
    },
    {
        path: '/add',
        component: 'user-add',
        title: 'Add'
    },
    {
        path: '/edit/:user',
        component: 'user-edit',
        title: 'Edit'
    }
]
