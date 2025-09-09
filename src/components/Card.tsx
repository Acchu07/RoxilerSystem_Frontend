export function Card({data, cardHeader}: { data: any, cardHeader: string }) {
    return (
        <div className="card w-96 bg-base-100 card-xl shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{`${cardHeader.toUpperCase()} ARE ${data}`}</h2>
            </div>
        </div>
    )
}

