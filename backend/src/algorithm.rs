use nalgebra as na;
use rand::prelude::*;

fn simulate(
    population: &mut Vec<Individual>,
    grid_size: i32,
    num_iterations: i32,
    movement_speed: f64,
    infection_radius: f64,
    infection_probability: f64,
    probability_of_dying: f64,
) {
    for _ in 0..num_iterations {
        for i in 0..population.len() {
            let individual = &mut population[i];
            individual.move_individual(5.0);

            println!("Stage {}", i);
            for (index, other) in population.iter_mut().enumerate() {
                if individual.is_infected {
                    if other.is_infected {
                        other.dead_treated(probability_of_dying);
                        continue;
                    }
                    if !other.alive {
                        continue;
                    }
                    let dist = distance(&individual.position, &other.position);
                    if dist <= infection_radius && rand::random::<f64>() <= infection_probability {
                        other.is_infected = true;
                    }
                }
            }
        }
    }
}

fn distance(pos1: &na::Point2<f64>, pos2: &na::Point2<f64>) -> f64 {
    na::distance(pos1, pos2)
}
