export default {
    async addTask(task) {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        const { id } = await res.json()
        return id
    },
// eslint-disable-next-line no-unused-vars
    async editTask(id) {
        //use PUT method and update selected task by id
    },
// eslint-disable-next-line no-unused-vars
    async deleteTask(id) {
        //use DELETE method and remove task by id
    }
}