import { Vector2 } from "./Vector2";

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
        this.frameSize = frameSize ?? new Vector2(16,16); // base tileset is 16x16 for objects not hero
        this.hFrames = hFrames ?? 1; // ?? creates a default that assums 1
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map(); // we will populate a map with loops to go through the sprites
        this.scale = scale ?? 1;
        this.pozsition = position ?? new Vector2(0,0);
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
                    new Vector2(this.frameSize.x * h, this.frameSize.y * v) // size will be scaled on 32x32 sprites
                )
                frameCount++;
            }
        }
    }

    drawImage(ctx, x, y) {
       if (!this.resource.isLoaded) {
        return;
    }


    // Find the correct sprite sheet frame to use
    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame); // dynamically looks up frame map
    if (frame) {
        frameCoordX = frame.x; // invalid frame defaults to 0,0
        frameCoordY = frame.y;
    }
    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
        this.resource.image,
        frameCoordX,
        frameCoordY, // Taking from top Y corner of frame for sprite sheet
        frameSizeX, // How much to crop from sprite sheet 
        frameSizeY,
        x, // Where drawing is going on canvas
        y,
        frameSizeX * this.scale, // how it scales
        frameSizeY * this.scale,
        );
    }
}
