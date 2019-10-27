const socket = (users) => socket => {
    const userConnected = socket.decoded_token.username;
    users.push({ username: userConnected, socketId: socket.id });

    socket.on('disconnect', () => {
        let index = users.findIndex(user => {
            return (user.username === userConnected);
        });
        while (index !== -1) {
            users.splice(index, 1);
            index = users.findIndex(user => {
                return (user.username === userConnected);
            });
        }
    })

    socket.on('send_message', ({ from, dest, msg }) => {
        users.forEach(user => {
            const { username, socketId } = user;
            if (username === dest)
                socket.to(socketId).emit('received_message', { from, dest, msg });
        })
        // socket.to(socketId).emit('received_message', { from, dest, msg });
    });
};

export default socket;
