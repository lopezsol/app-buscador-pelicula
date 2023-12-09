import { useState } from "react"

export const BuscadorPeliculas = () => {
    const API_KEY = 'fe4489d493f83ee7c2f18e5c70946cfb'
    const URL_BASE = 'https://api.themoviedb.org/3/search/movie'
    const URL_BASE_PELICULA = 'https://image.tmdb.org/t/p/w500'
    const [pelicula, setPelicula] = useState('')
    const [datosPelicula, setDatosPelicula] = useState(null)
    const onChangeInput = (event) => {
        setPelicula(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        if (pelicula.length > 0) fetchData()

    }

    const fetchData = async () => {
        try {
            const respuesta = await fetch(`${URL_BASE}?query=${pelicula}&api_key=${API_KEY}`)
            const data = await respuesta.json()
            setDatosPelicula(data)
        }
        catch (error) {
            console.log('Ocurrió un error: ' + error)
        }
    }
    return (
        <>
            <h1>Buscador películas</h1>
            <form action="" className="container" onSubmit={onSubmit}>
                <input
                    type="text"
                    value={pelicula}
                    onChange={onChangeInput}
                />
                <button type="submit" >Buscar</button>
            </form>

            <div className="movie-list">
                {datosPelicula && (

                    datosPelicula.results.map(pelicula => {
                        return (
                            <div className="movie-card" key={pelicula.id}>
                                
                                    <img src={`${URL_BASE_PELICULA}${pelicula.poster_path}`} alt={`Imagen de ${pelicula.original_title}`} />
                                    <h2>{pelicula.original_title}</h2>
                                    <p>{pelicula.overview}</p>
                               
                            </div>
                        )
                    })


                )}
            </div>

        </>
    )
}
