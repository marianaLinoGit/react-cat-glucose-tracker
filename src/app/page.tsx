import { GlucoseChart } from "@/components/GlucoseChart/GlucoseChart";
import { GlucoseForm } from "@/components/GlucoseForm/GlucoseForm";
import { GlucoseList } from "@/components/GlucoseList/GlucoseList";
import { SummaryCards } from "@/components/SummaryCards/SummaryCards";

export default function Home() {
	return (
		<main className="page">
			<section className="hero">
				<div>
					<span className="hero__eyebrow">Diabetes felina</span>
					<h1>Nala Glucose Tracker</h1>
					<p>
						Acompanhe as medições de glicemia da sua gata, visualize
						tendências e identifique valores baixos, altos ou muito
						altos.
					</p>
				</div>
			</section>

			<SummaryCards />

			<section className="dashboard">
				<GlucoseForm />
				<GlucoseChart />
			</section>

			<GlucoseList />
		</main>
	);
}
