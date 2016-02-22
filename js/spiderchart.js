import React, { Component } from 'react'
import d3 from 'd3'

const padding = 60
const transition = 2000
const domain = [0, 5]
const axes = [
    'Evaluation',
    'Points',
    'Rebonds',
    'Passes',
    'Interceptions',
    'Contres',
]

export default class SpiderChart extends Component
{
    static propTypes = {
        width: React.PropTypes.string.isRequired,
        mainColor: React.PropTypes.string.isRequired,
        bgColor: React.PropTypes.string.isRequired,
        axesColor: React.PropTypes.string.isRequired,
    }

    state = {
        radius : 0,
        width  : 0,
    }

    hexToRgba(hex, opacity = 1) {
        let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
        hex = hex.replace(shorthandRegex,(m,r,g,b) => r+r+g+g+b+b )

        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)


        return result ? `rgba(${parseInt(result[1],16)},${parseInt(result[2],16)},${parseInt(result[3],16)},${opacity})` : null
    }

    slice(number) {
        return Math.PI * 2 * number / axes.length
    }

    rScale(value) {
        let f = d3.scale.linear()
            .domain(domain)
            .range([0, this.state.radius])

        return value !== undefined ? f(value) : f
    }

    blob(value) {
        let f = d3.svg.line.radial()
            .angle((d, i) => this.slice(i))
            .radius(this.rScale())
            .interpolate('cardinal-closed')

        return f(value)
    }

    initialize(el) {
        let svg = el.selectAll('svg').data([this.props.datas]),
        init = svg.enter().append('svg').append('g')

        let axisWrap = init.append('g').attr('class', 'radar-axis')
        axisWrap
            .selectAll('.radar-axis-level')
            .data(d3.range(domain[0], domain[1] + 1).reverse())
            .enter()
                .append('circle')
                .attr('class', 'radar-axis-level')
                .style('fill',this.hexToRgba(this.props.bgColor,0.15))

        let axisLines = axisWrap.selectAll('.radar-axis-lines')
            .data(axes)
            .enter()
                .append('g')
                .style('stroke',this.hexToRgba(this.props.axesColor))
                .attr('class', 'radar-axis-lines')

        axisLines.append('line')
            .attr('class', 'radar-axis-line')
            .attr('x1', 0)
            .attr('y1', 0)

        axisLines.append('text')
            .style('fill',this.hexToRgba(this.props.axesColor))
            .attr('class', 'radar-axis-label')
            .text((d, i) => axes[i])

        init.selectAll('.radar-area')
            .data([this.props.datas])
            .enter()
                .append('path')
                .attr('class', 'radar-area')
                .attr('d', (d) => this.blob(d))

        init.selectAll('.radar-point')
            .data(this.props.datas)
            .enter()
                .append('circle')
                .attr('class', 'radar-point')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', 5)

        svg
            .attr('width', this.state.width + 2 * padding)
            .attr('height', this.state.width + 2 * padding)


        let g = svg.select('g')
            .attr('transform', `translate(${padding + this.state.radius},${padding + this.state.radius})`)

        return g
    }

    radar(el) {
        let g = this.initialize(el)

        g.selectAll('.radar-axis-level')
            .attr('r', (d) => this.state.radius / domain[1] * d)

        g.selectAll('.radar-axis-line')
            .attr('x2', (d, i) => {
                return this.rScale(domain[1] * 1.025) * Math.cos(this.slice(i) - Math.PI * 0.5)
            })
            .attr('y2', (d, i) => {
                return this.rScale(domain[1] * 1.025) * Math.sin(this.slice(i) - Math.PI * 0.5)
            })

        g.selectAll('.radar-axis-label')
            .attr('x', (d, i) => {
                return this.rScale(domain[1] * 1.15) * Math.cos(this.slice(i) - Math.PI * 0.5)
            })
            .attr('y', (d, i) => {
                return this.rScale(domain[1] * 1.15) * Math.sin(this.slice(i) - Math.PI * 0.5)
            })
            .attr('text-anchor', function(d) {
                let x = d3.select(this).attr('x')
                return (x > 1) ? 'start' : (x < -1) ? 'end' : 'middle'
            })

        g.select('.radar-area')
            .style('fill',this.hexToRgba(this.props.mainColor,0.6))
            .transition()
                .duration(transition)
                .ease('cubic-out')
                .attr('d', (d) => this.blob(d))

        g.selectAll('.radar-point')
            .style('fill',this.hexToRgba(this.props.mainColor,0.8))
            .data((d) => d)
            .on("mouseover", (d) => {
                d3.select("#tooltip")
                    .style("left", d3.event.pageX + "px")
                    .style("top", d3.event.pageY + "px")
                    .style("opacity", 1)
                    .select("#value")
                    .text(d)
            })
            .on("mouseout", (d) => {
                d3.select("#tooltip")
                    .style("opacity", 0)
            })
            .transition()
                .duration(transition)
                .ease('cubic-out')
                .attr('cx', (d, i) => {
                    return this.rScale(d) * Math.cos(this.slice(i) - Math.PI * 0.5)
                })
                .attr('cy', (d, i) => {
                    return this.rScale(d) * Math.sin(this.slice(i) - Math.PI * 0.5)
                })
    }

    updateChart() {
        let width = this.props.width - 2 * padding

        this.setState({
            width,
            'radius' : width * 0.5,
        },() =>
        {
            let chart = d3
                .select(React.findDOMNode(this))
                .datum(this.props.datas)

            this.radar(chart)
        })
    }

    componentDidMount() {
        this.updateChart()
    }

    componentWillReceiveProps() {
        this.updateChart()
    }

    render() {
        return (
            <div className="radarChart">
                <div id="tooltip" className="hidden">
                    <p>
                        Current value :
                        <span id="value"></span>
                    </p>
                </div>
            </div>
        )
    }
}