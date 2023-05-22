export class Circle {
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
    set_x_y(x, y) {
        this.x = x;
        this.y = y;
    }
    move_radius(radius) {
        this.radius += radius;
    }
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.strokeStyle = "black";
        context.stroke();
    }
}

export function is_in_circle(x, y, circles_array)
{
    for (let index = 0; index < circles_array.length; index++) {
        if (circles_array[index].is_pos_in_circle(x, y)) {
            return index;
        }
    }
    return -1;
}
