function StudentList(props) {
    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                        <th>Matricula</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>props.data.id</th>
                        <td>props.data.nombre</td>
                        <td>props.data.apellido</td>
                        <td>props.data.correo</td>
                        <td>props.data.telefono</td>
                        <td>props.data.matricula</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StudentList;