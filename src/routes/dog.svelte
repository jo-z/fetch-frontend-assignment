<script>
	let { age, img, breed, id, zip_code, name } = $props();
</script>

<div class="dog-box">
	<img src={img} alt={`picture of ${name}`} />
	<div class="info-box">
		<p>Name: {name}</p>
		<p>Age: {age}</p>
		<p>Breed: {breed}</p>
		<p>Zip Code: {zip_code}</p>
	</div>
</div>

<style>
	.dog-box {
		border: 1px solid black;
		margin: 1rem;
	}
	img {
		width: 400px;
		height: 400px;
		object-fit: contain;
		padding: 10px;
		object-position: 50% 50%;
	}
</style>
