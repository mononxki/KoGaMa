<div align="center">

# ⚠ WARNING ⚠

Remember that tweaking game files or using any sort of modification to gain advantage will result in your ban if you get reported.

✨ <ins>I do not take any responsibility for what happens to your account.</ins>✨

[THE GUIDANCE BELOW IS OUTDATED: CHECK THIS VIDEO](https://youtu.be/iwUM8oK7Mes)



# Credits

A whole lot of appreciation towards [AOXU](https://www.kogama.com/profile/5585592/) for showing me step by step how to do it.


</div>

# Requirements

- [UnityAssetBundleExtractor](https://github.com/SeriousCache/UABE)
- Your personal crosshair or [one of those](https://github.com/LowOnGravity/CustomCrosshair/tree/main/Crosshairs)

# Guide

Start off by pressing **Win + R** to open the RUN Windows Module.

Type in `%LOCALAPPDATA%` and after executing locate the folder called `KogamaLauncher-WWW`.

Head over to this path: `\KogamaLauncher-WWW\Launcher\Standalone\kogama_Data`.

Now open up Unity Assets Bundle Extractor, go to **FILE** and press on **OPEN**.

Navigate to your KoGaMaData directory and open the file called `sharedassets1.assets` with UABE.

![Image](https://user-images.githubusercontent.com/96681438/226176518-3d9c9b87-b9d1-43a3-a41b-3da3a7f8a051.png)

In UABE, select `sharedassets1.assets` and focus on `TYPE`, we're interested in `TEXTURE 2D`.

Locate the module called **CrosshairMouseCursorWhite@128w**.

![Image](https://user-images.githubusercontent.com/96681438/226176618-0ec75c3a-5987-48f6-97a2-dc58a42c348e.png)

Head over to the `PLUGINS` tab and select `EDIT`.

![Image](https://user-images.githubusercontent.com/96681438/226176672-8b1da062-13ff-48b9-9093-df05484942eb.png)
![Image](https://user-images.githubusercontent.com/96681438/226176668-23e8312c-f686-4a24-a21f-332cfd960ea9.png)

Press `LOAD` next to "Texture" and select your `CROSSHAIR.PNG`.

After doing it, press `OKAY`.

Your next step is to save your edited assets file, press on `FILE` and then on `APPLY & SAVE ALL`.

![Image](https://user-images.githubusercontent.com/96681438/226176805-95c6c85e-025f-460f-a341-3d7a65d19b55.png)

Before rushing through the saving process, remember to delete `-MOD` from the edited module before continuing further.

![Image](https://user-images.githubusercontent.com/96681438/226176915-284ebf03-7ab4-47a3-b0ce-4f30432e01dc.png)

You can now head back to the KoGaMaData directory (`\KogamaLauncher-WWW\Launcher\Standalone\kogama_Data`) and place your edited file in there.

After joining a game, your crosshair should be whatever you made it.

> If you encounter any language issues, here is a [video format guide](https://youtu.be/iwUM8oK7Mes).

![Image](https://user-images.githubusercontent.com/96681438/226177170-a8dd97b4-9842-441c-a2c9-fa9e0aca0f38.png)
