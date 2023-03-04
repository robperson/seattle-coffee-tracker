import RefreshButton from "./RefreshButton";

type Props = {
    lat: number
    lng: number
    radius: number
    limit: number
    setFilters: any
}
const Filters = ({lat, lng, radius, limit, setFilters}: Props) => {
    return (
    <div className="filters">
        <div>
            <span>Lat: </span>
            <input type="text" value={lat} onChange={e => setFilters({lat: e.target.value, lng, radius, limit})}></input>
        </div>
        <div>
            <span>Lng: </span>
            <input type="text" value={lng} onChange={e => setFilters({lat, lng: e.target.value, radius, limit})}></input>
        </div>
        <div>
            <span>Radius (in meters): </span>
            <input type="text" value={radius} onChange={e => setFilters({lat, lng, radius: e.target.value, limit})}></input>
        </div>
        <div>
            <span>Limit: </span>
            <input type="text" value={limit} onChange={e => setFilters({lat, lng, radius, limit: e.target.value})}></input>
        </div>
        
        <RefreshButton />
    </div>
    )
}

export default Filters;