import loaderGif from '../assets/loader.gif'
import'./css/Loader.component.css'

export default function Loader(){
    return(
        <div className="containerLoader">
            <img src={loaderGif} alt="Cargando..." className="spinner" />
            <p className="small">Cargando data...</p>
        </div>
    )
}