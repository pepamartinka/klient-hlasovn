radio.setGroup(202)
radio.setTransmitPower(7)
radio.setTransmitSerialNumber(true)
let seriovy = control.deviceSerialNumber()
// tlacitkem A hlasuju A
// tlacitkem B hlasuju B
// tlacitkama AB najednou hlasuju C
// kdyz stistknu logo hlasuju D
let enable = 0
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    
    if (name == "zapnuto" && value == 1) {
        basic.showIcon(IconNames.Yes, 3000)
        enable = 1
    }
    
    if (name == "vypnuto" && value == 0) {
        basic.showIcon(IconNames.No, 3000)
        enable = 0
    }
    
    if (name == "uspesne" && value == 5) {
        music.startMelody(music.builtInMelody(Melodies.BaDing))
    }
    
})
if (enable == 1) {
    input.onButtonPressed(Button.A, function on_button_pressed_a() {
        radio.sendValue("vote", 1)
        basic.showString("A")
    })
    input.onButtonPressed(Button.B, function on_button_pressed_b() {
        radio.sendValue("vote", 2)
        basic.showString("B")
    })
    input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
        radio.sendValue("vote", 3)
        basic.showString("C")
    })
    input.onLogoEvent(TouchButtonEvent.Pressed, function on_logo_event_pressed() {
        radio.sendValue("vote", 4)
        basic.showString("D")
    })
} else {
    basic.showIcon(IconNames.No)
}

