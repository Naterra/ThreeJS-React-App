import Header from '../components/Header';
import Scene from '../components/Three/Scene';

export default function Home() {
    return (
        <div className="container">
            <Header />
            <main>
                <Scene />
            </main>
        </div>
    );
}
