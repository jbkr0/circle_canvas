const canvas = document.getElementById('canvas_circle');
const context = canvas.getContext('2d');
const circles = [];
const input_radius = document.getElementById('radius');
const input_x = document.getElementById('x');
const input_y = document.getElementById('y');
var select_index = -1;
var select_radius = input_radius.value;
var select_x = input_x.value;
var select_y = input_y.value;

input_radius.addEventListener('input', update_values);
input_x.addEventListener('input', update_values);
input_y.addEventListener('input', update_values);

function update_values() {
    select_radius = input_radius.value == "" || parseInt(input_radius.value) < 0 ? 0 : parseInt(input_radius.value);
    select_x = input_x.value == "" ? 0 : parseInt(input_x.value);
    select_y = input_y.value == "" ? 0 : parseInt(input_y.value);
    if (select_index == -1)
        return;
    circles[select_index].radius = select_radius;
    circles[select_index].x = select_x;
    circles[select_index].y = select_y;
}

class circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    get_x() {
        return this.x;
    }
    get_y() {
        return this.y;
    }
    get_radius() {
        return this.radius;
    }
    is_pos_in_circle(x, y) {
        let d2;
        d2 = ((x - this.x) * (x - this.x)) + ((y - this.y) * (y - this.y));
        return !(d2 > this.radius * this.radius);
    }
}

function is_in_circle(x, y)
{
    for (let index = 0; index < circles.length; index++) {
        if (circles[index].is_pos_in_circle(x, y)) {
            return index;
        }
    }
    return -1;
}

function select_circle(select_index)
{
    input_radius.value = circles[select_index].get_radius();
    input_x.value = circles[select_index].get_x();
    input_y.value = circles[select_index].get_y();
}

canvas.addEventListener('click', (event) => {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    select_index = is_in_circle(x, y);
    
    if (select_index != -1)
        select_circle(select_index);
    else
        circles.push(new circle(x, y, 20));
});

function draw_circle()
{
    var color;
    
    for (let index = 0; index < circles.length; index++) {
        color = 'black';
        if (index == select_index)
            color = 'green';
        context.beginPath();
        context.arc(circles[index].get_x(), circles[index].get_y(), circles[index].get_radius(), 0, 2 * Math.PI);
        context.strokeStyle = color;
        context.stroke();
    }
}

function get_tangents(c1, c2) {
    const d = Math.sqrt((c1.get_x() - c2.get_x()) ** 2 + (c1.get_y() - c2.get_y()) ** 2);

    if (d < c1.get_radius() + c2.get_radius())
      return null;
  
    const p1 = {x: c1.get_x() + (c1.get_radius() * (c2.get_x() - c1.get_x())) / d, y: c1.get_y() + (c1.get_radius() * (c2.get_y() - c1.get_y())) / d,};
    const p2 = {x: c2.get_x() + (c2.get_radius() * (c1.get_x() - c2.get_x())) / d, y: c2.get_y() + (c2.get_radius() * (c1.get_y() - c2.get_y())) / d,};
  
    const v1 = {x: (p1.y - c1.get_y()) / c1.get_radius(), y: (c1.get_x() - p1.x) / c1.get_radius(),};
    const v2 = {x: (p2.y - c2.get_y()) / c2.get_radius(), y: (c2.get_x() - p2.x) / c2.get_radius(),};
  
    const t1 = {x: c1.get_x() + c1.get_radius() * v1.x, y: c1.get_y() + c1.get_radius() * v1.y,};
    const t2 = {x: c2.get_x() + c2.get_radius() * v1.x, y: c2.get_y() + c2.get_radius() * v1.y,};
    const t3 = {x: c1.get_x() + c1.get_radius() * v2.x, y: c1.get_y() + c1.get_radius() * v2.y,};
    const t4 = {x: c2.get_x() + c2.get_radius() * v2.x, y: c2.get_y() + c2.get_radius() * v2.y,};
  
    return {t1, t2, t3, t4};
}

function draw_tangent()
{
    if (circles.length < 2)
        return;
    for (let index = 0; index < circles.length - 1; index++) {
        const tangent = get_tangents(circles[index], circles[index + 1]);
        if (tangent === null)
            continue;
        context.strokeStyle = "red";
        context.beginPath();
        context.moveTo(tangent.t1.x, tangent.t1.y);
        context.lineTo(tangent.t2.x, tangent.t2.y);
        context.stroke();
        context.beginPath();
        context.moveTo(tangent.t3.x, tangent.t3.y);
        context.lineTo(tangent.t4.x, tangent.t4.y);
        context.stroke();
    }
}

function draw() 
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw_circle();
    draw_tangent();
    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
