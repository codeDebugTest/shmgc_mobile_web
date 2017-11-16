function CreateG2Mobile(config, pixelRatio) {
    // GM.Global.pixelRatio = pixelRatio;
    const mobileChart = new GM.Chart(config);
    return mobileChart;
}
window.CreateG2Mobile = CreateG2Mobile;
