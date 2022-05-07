radio.set_group(202)
radio.set_transmit_power(7)
radio.set_transmit_serial_number(True)
seriovy = control.device_serial_number()

#tlacitkem A hlasuju A
#tlacitkem B hlasuju B
#tlacitkama AB najednou hlasuju C
#kdyz stistknu logo hlasuju D

enable=0

def on_received_value(name, value):
    global enable
    if name=="zapnuto" and value== 1:
        basic.show_icon(IconNames.YES,3000)
        enable=1
    
    if name=="vypnuto" and value==0:
        basic.show_icon(IconNames.NO,3000)
        enable=0

    if name=="uspesne" and value==5:
        music.start_melody(music.built_in_melody(Melodies.BA_DING))
radio.on_received_value(on_received_value)

if enable==1:
    def on_button_pressed_a():
        radio.send_value("vote",1)
        basic.show_string("A")

    input.on_button_pressed(Button.A, on_button_pressed_a)

    def on_button_pressed_b():
        radio.send_value("vote", 2)
        basic.show_string("B")
    input.on_button_pressed(Button.B, on_button_pressed_b)

    def on_button_pressed_ab():
        radio.send_value("vote", 3)
        basic.show_string("C")
    input.on_button_pressed(Button.AB, on_button_pressed_ab)

    def on_logo_event_pressed():
        radio.send_value("vote", 4)
        basic.show_string("D")
    input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_event_pressed)
else: basic.show_icon(IconNames.NO)
