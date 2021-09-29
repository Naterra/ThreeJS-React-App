import Header from '../components/Header';
import Scene from '../components/Three/Scene';

export default function Home() {
    const onMouseDown=(position)=>{
        console.log('%c custom onMouseDown', 'color:blue', position);
    };

    return (
        <div className="container">
            <Header />
            <main>
                <Scene
                    onMouseDown={onMouseDown}
                />
            </main>
        </div>
    );
}
