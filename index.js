import { Circle, is_in_circle } from './circle.js';
import { draw_canvas } from "./draw.js";

const canvas = document.getElementById('canvas_circle');
const context = canvas.getContext('2d');
const circles_array = [];
var select_index = -1;
var is_move = false;

function mouse_wheel(event) 
{
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    const direction = event.deltaY > 0;

    select_index = is_in_circle(x, y, circles_array);
    if (select_index === -1)
        return;
    if (direction === true && circles_array[select_index].get_radius() > 2)
        circles_array[select_index].move_radius(-2);
    else if (direction === false)
        circles_array[select_index].move_radius(2);
}

function mouse_down(event)
{
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    
    select_index = is_in_circle(x, y, circles_array);
    if (select_index === -1)
        circles_array.push(new Circle(x, y, 20));
    else
        is_move = true;
}

function mouse_move(event)
{
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    
    if (select_index !== -1 && is_move)
        circles_array[select_index].set_x_y(x, y);
}

canvas.addEventListener('wheel', mouse_wheel);
canvas.addEventListener('mousedown', mouse_down);
canvas.addEventListener('mousemove', mouse_move);
canvas.addEventListener('mouseup', () => { is_move = false; });
    
requestAnimationFrame(() => draw_canvas(circles_array, canvas, context));
