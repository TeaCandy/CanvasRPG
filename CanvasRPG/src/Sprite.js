export class Sprite {
    constructor ({
        resource, // image we want to draw
        frameSize, // size of crop of img
        hFrames, // horizontal arrangement of sprite sheet
        vFrames, // vertical arrangement of sprite sheet
        frame, // which frame we want to show
        scale, // how large to draw imgae 
        position, // where to draw it on canvas
    }) {
        this.resource = resource;
        this.frameSize = frameSize;
        this.hFrames = hFrames ?? 1; // ?? creates a default that assums 1
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map(); // we will populate a map with loops to go through the sprites
        this.scale = scale ?? 1;
        this.pozsition = position;
        this.buildFrameMap();
    }

    buildFrameMap() {
        let frameCount = 0; 
        // start with y axix (vertical) to loop vert down sprite sheet
        for (let v = 0; v < this.vFrames; v++) {
            for (let h = 0; h < this.hFrames; h++) {
                console.log("frame", h, v)
                this.frameMap.set(
                    frameCount,
                    {x: 0, y: 0}
                )
                frameCount++;
            }
        }
    }

}
