function get_tangents(c1, c2) {
    const distance = Math.sqrt((c2.get_x() - c1.get_x()) ** 2 + (c2.get_y() - c1.get_y()) ** 2);

    if (distance < Math.abs(c2.get_radius() - c1.get_radius()))
        return null;

    const angle = Math.atan2((c2.get_y() - c1.get_y()), (c2.get_x() - c1.get_x()));
    const angleOffset = Math.acos((c1.get_radius() - c2.get_radius()) / distance);
    const tan_angle1 = angle + angleOffset;
    const tan_angle2 = angle - angleOffset;

    const tangents_points = [
        { x: c1.get_x() + c1.get_radius() * Math.cos(tan_angle1), y: c1.get_y() + c1.get_radius() * Math.sin(tan_angle1) },
        { x: c2.get_x() + c2.get_radius() * Math.cos(tan_angle1), y: c2.get_y() + c2.get_radius() * Math.sin(tan_angle1) },
        { x: c1.get_x() + c1.get_radius() * Math.cos(tan_angle2), y: c1.get_y() + c1.get_radius() * Math.sin(tan_angle2) },
        { x: c2.get_x() + c2.get_radius() * Math.cos(tan_angle2), y: c2.get_y() + c2.get_radius() * Math.sin(tan_angle2) }
    ];
    return tangents_points;
}

function draw_tangent(circles_array, context)
{
    if (circles_array.length < 2)
        return;
    for (let index = 0; index < circles_array.length - 1; index++) {
        const tangents = get_tangents(circles_array[index], circles_array[index + 1]);
        if (tangents === null)
            continue;
        context.beginPath();
        for (let i = 0; i < 4; i += 2) {
            context.moveTo(tangents[i].x, tangents[i].y);
            context.lineTo(tangents[i + 1].x, tangents[i + 1].y);
        }
        context.strokeStyle = "red";
        context.stroke();
    }
}

function draw_circle(circles_array, context)
{
    for (let index = 0; index < circles_array.length; index++) {
        circles_array[index].draw(context);
    }
}

export function draw_canvas(circles_array, canvas, context)
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw_circle(circles_array, context);
    draw_tangent(circles_array, context);
    requestAnimationFrame(() => draw_canvas(circles_array, canvas, context));
}
