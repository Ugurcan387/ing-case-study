import {Router} from '@vaadin/router';
import {views} from './router/routes';

const outlet = document.getElementById('outlet');

const router = new Router(outlet);
router.setRoutes(views);