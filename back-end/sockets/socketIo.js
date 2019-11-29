const socket = (users) => socket => {
    const userConnected = socket.decoded_token.username;
    users.push({ username: userConnected, socketId: socket.id });
    console.log(users)

    socket.on('send_message', ({ from, dest, msg }) => {
        console.log("ON ICI")
        users.forEach(user => {
            const { username, socketId } = user;
            if (username === dest)
                socket.to(socketId).emit('received_message', { from, dest, msg });
        })
        socket.to(socketId).emit('received_message', { from, dest, msg });
    });

    // socket.on('disconnect', () => {
    //     console.log("OFF ICI")
    //     let index = users.findIndex(user => {
    //         return (user.username === userConnected);
    //     });
    //     while (index !== -1) {
    //         users.splice(index, 1);
    //         index = users.findIndex(user => {
    //             return (user.username === userConnected);
    //         });
    //     }
    // })


};

export default socket;
