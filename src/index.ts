import Server from "./app/Server";

enum ExitStatus {
    Failure = 1,
    Success = 0
}

process.on('unhandledRejection', (reason, promise) => {
    console.error(
      `App exiting due to an unhandled promise: ${promise} and reason ${reason}`
    );
    throw reason;
});
  
process.on('uncaughtException', (err) => {
    console.error(`App exiting due to an uncaught exception: ${err}`);
    process.exit(ExitStatus.Failure);
});

(async (): Promise<void> => {
    try {
        const server = Server.create();
        await server.init();
        server.start();

        // Graceful shutdown
        const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
        for (const sig of exitSignals) {
            process.on(sig, async () => {
                try {
                    server.close();
                    console.info(`App exited with sucess`);
                    process.exit(ExitStatus.Success);
                } catch (error) {
                    console.error(`App exited with error: ${error}`);
                    process.exit(ExitStatus.Failure);
                }
            });
        }
    } catch (error) {
        console.error(`App exited with error: ${error}`);
        process.exit(ExitStatus.Failure);
    }
})();