import React from 'react';
import GlassCard from './GlassCard';

export default function About() {
    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-center">
            <div className="container mx-auto max-w-5xl">
                <GlassCard className="about-card p-8 md:p-12 lg:p-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 font-['Syne'] text-gradient text-center">About Me</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-pure-white)] to-[var(--color-silver-gray)] mx-auto rounded-full box-glow mb-10" />

                    <div className="text-gray-300 font-['DM_Sans'] text-lg leading-relaxed space-y-6 max-w-3xl mx-auto text-center md:text-left">
                        <p>
                            I work at the intersection of computer vision and backend engineering, building real-time systems around YOLO and YOLO-Pose that run in production, not just in a notebook. That means GPU-accelerated inference with TensorRT and ONNX, asynchronous processing pipelines, and the FastAPI services that expose them to the rest of a product.
                        </p>
                        <p>
                            On the GenAI side, I build RAG pipelines with LangChain and vector databases like Qdrant and Pinecone, and ship the whole stack with Docker, Kubernetes, and CI/CD so it survives contact with real traffic. The parts I care about most are the ones people skip: batching, queuing, and the failure modes that only show up under load.
                        </p>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
}
