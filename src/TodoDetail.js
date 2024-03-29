import { useParams } from "react-router-dom";

export default function TodoDetail(props) {
    const { key } = useParams();
    const deed = props.getDeed(key);

    return(
        <section>
            {deed.done &&
                <p className="has-text-success">
                    выполнено
                </p>
            }
            <h1>{deed.title}</h1>
            <p>{deed.createdAt}</p>
            {deed.desc && <p>{deed.desc}</p>}
            {deed.image && <p><img src={deed.image}
                                   alt="Иллюстраци"/></p>}
        </section>
    )
}