
export function ViewTable({userData}: { userData: any}) {
    const isAdmin = userData[0]?.role ?? false;
    return (<div className="overflow-x-auto">
        <table className="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                {isAdmin ? <th>Role</th> : <th>Rating</th>}
            </tr>
            </thead>
            <tbody>
            {userData && userData.map(userObject => {
                return (
                    <tr key={userObject.id} className="hover:bg-base-300">
                        <td>{userObject.id}</td>
                        <td>{userObject.name}</td>
                        <td>{userObject.email}</td>
                        <td>{userObject.address}</td>
                        <td>{userObject?.role}</td>
                        <td>{userObject?.rating}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>)
}
