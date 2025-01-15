import { useParams } from "react-router-dom";

export default function CityPage() {
    const params = useParams();
    return <div>{params.cityName}</div>;
}
