import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload(): void {
    console.log("preload");
    this.load.spritesheet("tiles", "/assets/tileset.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.tilemapTiledJSON("map", "/assets/map.json");
  }

  create(): void {
    try {
      const map: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: "map" });
      if (!map) {
        console.error("Tilemap failed to load");
        return;
      }
      const tileset: Phaser.Tilemaps.Tileset | null = map.addTilesetImage(
        "tileset",
        "tiles"
      );
      if (!tileset) {
        console.error("Tileset failed to load");
        return;
      }
      const layer: Phaser.Tilemaps.TilemapLayer | null = map.createLayer(
        "Tile Layer 1",
        tileset,
        0,
        0
      );
      if (!layer) {
        console.error("Layer failed to load");
        return;
      }

      // 애니메이션 생성 (예: 타일 인덱스 1에 애니메이션 적용)
      this.anims.create({
        key: "tile-anim",
        frames: this.anims.generateFrameNumbers("tiles", { start: 0, end: 3 }), // GIF 프레임 수에 맞게 조정
        frameRate: 10,
        repeat: -1,
      });

      // 특정 타일에 애니메이션 적용 (예: 인덱스 1)
      layer.forEachTile((tile) => {
        if (tile.index === 1) {
          const sprite = this.add
            .sprite(tile.pixelX + 16, tile.pixelY + 16, "tiles")
            .play("tile-anim");
          sprite.setOrigin(0.5, 0.5); // 타일 중앙에 정렬
        }
      });

      // 오른쪽 클릭 이벤트
      layer.setInteractive();
      this.input.on(
        "pointerdown",
        (
          pointer: Phaser.Input.Pointer,
          _gameObjects: Phaser.GameObjects.GameObject[],
          event: MouseEvent
        ) => {
          if (pointer.rightButtonDown() && event.button === 2) {
            event.preventDefault();
            const tile = layer.getTileAtWorldXY(pointer.worldX, pointer.worldY);
            if (tile) {
              console.log(
                `Right-clicked tile at (${tile.x}, ${tile.y}), Tile Index: ${tile.index}`
              );
              tile.tint = 0xff0000; // 빨간색 틴트
            }
          }
        }
      );

      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    } catch (error) {
      console.error("Error in create:", error);
    }
  }

  update(): void {}
}
