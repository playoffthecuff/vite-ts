import footer from './components/footer';
import Header from './components/header';
import { Hero } from './components/hero';
import Main from './components/main';
import './style.css'

document.body.append(new Header().element, new Hero().element, new Main().element, footer)