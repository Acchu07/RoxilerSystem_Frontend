import {Card} from "./Card.tsx";

export function Dashboard({data}: { data: any }) {
    const objectPropertyName = Object.keys(data.data);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl text-center">{`${data.role} Dashboard`}</h1>
            <section className="flex justify-center gap-4">
                {objectPropertyName.map((propertyName) => {
                    return <Card key={propertyName} data={data.data[propertyName]} cardHeader={propertyName}/>
                })}
            </section>
        </div>
    )

}