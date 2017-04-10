import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
    selector: "[setHovering]"
})

export class HoverDirective {
    @HostBinding('class.hover') isHover = true;
    @HostBinding('class.hovering') hovering = false;

    @HostListener('mouseenter') onMouseEnter() {
        this.hovering = true;
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.hovering = false;
    }

    @Input() set setHovering(value){
        this.isHover = value;
    }
}