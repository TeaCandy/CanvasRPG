export class GameLoop {
    constructor(update, render) {
        

        this.lastFrameTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000/60; // 60 frames per second
        
        this.update = update;
        this.render = render;

        this.rafId = null; // request animation frame
        this.isRunning = false; // when the game starts we flip to true
    }
    mainLoop = (timestamp) => {
        if (!this.isRunning) return;

        let deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        // Accumulate all the time since the last time frame.
        this.accumulatedTime += deltaTime;

        //Fixed time step updates
        //If there's enough accumulated time to run one or more fixed updates, run these
        while (this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep); // pass the fixed time step
            this.accumulatedTime -= this.timeStep;
        }
        // Render
        this.render();

        this.rafId = requestAnimationFrame(this.mainLoop); // browser times update loop for us
    }

        start () {
            if (!this.isRunning) {
                this.isRunning = true;
                this.rafId = requestAnimationFrame(this.mainLoop); 
        }
     }

     stop () {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        this.isRunning = false;
     }
}