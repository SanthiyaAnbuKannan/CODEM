function createTask(id, delay) {
    return () => new Promise(resolve => {
        console.log(`Task ${id} started`);
        setTimeout(() => {
            console.log(`Task ${id} done — ${delay}ms`);
            resolve();
        }, delay);
    });
}

async function limitConcurrency(tasks, limit) {
    let index = 0;
    let running = 0;

    return new Promise(resolve => {
        function runNext() {
            while (running < limit && index < tasks.length) {
                const task = tasks[index++];
                running++;

                task().then(() => {
                    running--;
                    runNext();

                    if (index === tasks.length && running === 0) {
                        resolve();
                    }
                });
            }
        }

        runNext();
    });
}

const tasks = [
    createTask(1, 600),
    createTask(2, 1200),
    createTask(3, 900),
    createTask(4, 700),
    createTask(5, 1500),
    createTask(6, 1000),
    createTask(7, 800),
    createTask(8, 1300),
    createTask(9, 1100),
    createTask(10, 600)
];

async function run() {
    console.time("concurrent");
    await limitConcurrency(tasks, 3);
    console.timeEnd("concurrent");

    console.time("sequential");
    for (const task of tasks) {
        await task();
    }
    console.timeEnd("sequential");
}

run();