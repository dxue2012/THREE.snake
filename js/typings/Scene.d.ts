declare var Scene: Scene;

interface Scene {
    create(): any;

    addObject(obj: any);

    removeObjects();
    removeObject(obj: any);
}
